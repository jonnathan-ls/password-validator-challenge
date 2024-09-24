export const environment = {
    production: true,
    apiUrl: {
        LoadBalancer: "http://pwd-validator-alb-857814613.us-east-1.elb.amazonaws.com:8080",
        EC2: "http://ec2-107-22-85-101.compute-1.amazonaws.com:8080",
        Docker: "http://localhost:8080",
        Angular: '/api-pwd-validator',
    },
};
