import { serverApi } from "@/lib/api-server";
import { ApiResponse } from "@/types/api";
import { TrainerDetail } from "@/types/trainer";

export async function getTrainerById(trainerId: string): Promise<ApiResponse<TrainerDetail>> {
    return serverApi(`/api/users/trainers/${trainerId}`);
}
