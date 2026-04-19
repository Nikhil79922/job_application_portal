import { createBreaker } from "./circuitBreaker";

export const authBreaker = createBreaker("Auth");
export const userBreaker = createBreaker("User");
export const jobBreaker = createBreaker("Job");