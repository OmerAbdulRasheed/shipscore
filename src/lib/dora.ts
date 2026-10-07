import { z } from "zod";

export const DeploymentSchema = z.object({
  createdAt: z.coerce.date(),
  status: z.enum(["success", "failure"]),
});
export type Deployment = z.infer<typeof DeploymentSchema>;

/** Successful deployments per day over the given window. */
export function deploymentFrequency(deployments: Deployment[], windowDays: number): number {
  if (windowDays <= 0) throw new Error("windowDays must be positive");
  const successful = deployments.filter((d) => d.status === "success").length;
  return successful / windowDays;
}

/** Share of deployments that failed, between 0 and 1. */
export function changeFailureRate(deployments: Deployment[]): number {
  if (deployments.length === 0) return 0;
  const failed = deployments.filter((d) => d.status === "failure").length;
  return failed / deployments.length;
}
