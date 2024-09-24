/**
 * Defines the possible deployment types for the API.
 * 
 * - `LoadBalancer`: The API is deployed on ECS with the use of a Load Balancer.
 * - `EC2`: The API is hosted on an EC2 instance.
 * - `Docker`: The API is running in a Docker container (local).
 * - `Angular`: The API is integrated into an Angular application through a reverse proxy (local).
 */
export type ApiDeployType = 'LoadBalancer' | 'EC2' | 'Docker' | 'Angular';
