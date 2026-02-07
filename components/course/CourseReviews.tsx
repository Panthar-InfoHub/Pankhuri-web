"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    getCourseReviews,
    createCourseReview,
    updateCourseReview,
    deleteCourseReview,
    Review,
    ReviewStats,
} from "@/lib/api/reviews";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";

interface CourseReviewsProps {
    courseId: string;
}

export function CourseReviews({ courseId }: CourseReviewsProps) {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [myReview, setMyReview] = useState<Review | null>(null);
    const [stats, setStats] = useState<ReviewStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [sort, setSort] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const fetchReviews = async (pageNum: number = 1, sortBy: typeof sort = 'newest') => {
        try {
            setLoading(true);
            const { data } = await getCourseReviews(courseId, pageNum, 10, sortBy);

            if (pageNum === 1) {
                setReviews(data.reviews);
            } else {
                setReviews(prev => [...prev, ...data.reviews]);
            }

            setMyReview(data.myReview);
            setStats(data.stats);
            setHasMore(data.pagination.hasNext);
            setPage(pageNum);
        } catch (error) {
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [courseId]);

    const handleSubmitReview = async () => {
        if (!session) {
            toast.error("Please login to submit a review");
            return;
        }

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (reviewText.trim().length < 10) {
            toast.error("Review must be at least 10 characters");
            return;
        }

        setSubmitting(true);
        try {
            if (myReview) {
                // Update existing review
                const { data } = await updateCourseReview(courseId, {
                    rating,
                    review: reviewText,
                });
                setMyReview(data);
                toast.success("Review updated successfully");
            } else {
                // Create new review
                const { data } = await createCourseReview(courseId, {
                    rating,
                    review: reviewText,
                });
                setMyReview(data);
                toast.success("Review submitted successfully");
            }

            setIsEditing(false);
            setRating(0);
            setReviewText("");
            fetchReviews(1, sort); // Refresh reviews
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteReview = async () => {
        setShowDeleteDialog(false);
        setSubmitting(true);
        try {
            await deleteCourseReview(courseId);
            setMyReview(null);
            setRating(0);
            setReviewText("");
            setIsEditing(false);
            toast.success("Review deleted successfully");
            fetchReviews(1, sort); // Refresh reviews
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete review");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditReview = () => {
        if (myReview) {
            setRating(myReview.rating);
            setReviewText(myReview.review);
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setRating(0);
        setReviewText("");
    };

    const handleSortChange = (newSort: typeof sort) => {
        setSort(newSort);
        fetchReviews(1, newSort);
    };

    const loadMore = () => {
        fetchReviews(page + 1, sort);
    };

    const renderStars = (count: number, interactive: boolean = false, size: string = "w-5 h-5") => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => interactive && setRating(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
                    >
                        <Star
                            className={`${size} ${star <= (interactive ? (hoverRating || rating) : count)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'fill-gray-800 text-gray-700'
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const renderRatingDistribution = () => {
        if (!stats) return null;

        const maxCount = Math.max(...Object.values(stats.ratingDistribution));

        return (
            <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = stats.ratingDistribution[star as keyof typeof stats.ratingDistribution];
                    const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

                    return (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-xs text-gray-600 w-6">{star} ★</span>
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 rounded-full"
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-500 w-10 text-right">{count}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
            </div>

            {/* Stats Overview */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 border border-gray-200 rounded-3xl p-8">
                    <div className="space-y-4 flex flex-col justify-center">
                        <div className="text-center md:text-left">
                            <div className="text-6xl font-bold text-gray-900 mb-3">
                                {stats.averageRating.toFixed(1)}
                            </div>
                            <div className="flex justify-center md:justify-start mb-3">
                                {renderStars(Math.round(stats.averageRating))}
                            </div>
                            <p className="text-gray-600 text-sm">
                                Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
                            Rating Distribution
                        </h3>
                        {renderRatingDistribution()}
                    </div>
                </div>
            )}

            {/* My Review / Review Form */}
            {session && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    {myReview && !isEditing ? (
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge className="bg-purple-100 text-purple-700 border-none">
                                            Your Review
                                        </Badge>
                                        {renderStars(myReview.rating)}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{myReview.review}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Posted {formatDistanceToNow(new Date(myReview.createdAt), { addSuffix: true })}
                                        {myReview.updatedAt !== myReview.createdAt && ' • Edited'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleEditReview}
                                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowDeleteDialog(true)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {myReview ? 'Edit Your Review' : 'Write a Review'}
                            </h3>

                            <div>
                                <label className="text-sm text-gray-700 mb-2 block">Your Rating</label>
                                {renderStars(rating, true, "w-8 h-8")}
                            </div>

                            <div>
                                <label className="text-sm text-gray-700 mb-2 block">Your Review</label>
                                <Textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your experience with this course..."
                                    className="min-h-[120px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none"
                                    maxLength={1000}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    minimum 10 characters, {reviewText.length}/1000 characters
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSubmitReview}
                                    disabled={submitting || rating === 0 || reviewText.trim().length < 10}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {myReview ? 'Update Review' : 'Submit Review'}
                                </Button>
                                {(isEditing || myReview) && (
                                    <Button
                                        variant="ghost"
                                        onClick={handleCancelEdit}
                                        disabled={submitting}
                                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Sort Options */}
            {/* {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <div className="flex gap-2">
                        {(['newest', 'oldest', 'highest', 'lowest'] as const).map((sortOption) => (
                            <Button
                                key={sortOption}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSortChange(sortOption)}
                                className={`text-xs ${sort === sortOption
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Reviews List */}
            <div className="space-y-4">
                {loading && page === 1 ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse border border-gray-200" />
                        ))}
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No reviews yet</h3>
                        <p className="text-sm text-gray-500">
                            Be the first to share your experience with this course!
                        </p>
                    </div>
                ) : (
                    <>
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        {review.user.displayName?.[0]?.toUpperCase() || review.user.profileImage ? (
                                            review.user.profileImage ? (
                                                <img
                                                    src={review.user.profileImage}
                                                    alt={review.user.displayName || 'User'}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                review.user.displayName?.[0]?.toUpperCase() || 'U'
                                            )
                                        ) : (
                                            'U'
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {review.user.displayName || 'Anonymous User'}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {renderStars(review.rating, false, "w-4 h-4")}
                                                    <span className="text-xs text-gray-500">
                                                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.review}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {hasMore && (
                            <div className="text-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={loadMore}
                                    disabled={loading}
                                    className="border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        'Load More Reviews'
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="bg-white border-gray-300">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-900">Delete Review?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            Are you sure you want to delete your review? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border-gray-300">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteReview}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
