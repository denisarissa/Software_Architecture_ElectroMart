import dotenv from "dotenv";
dotenv.config();

export const config = {
    taxRate: 1.25,
    discountRate: 0.15,
    
    unfinishedFeatureEnabled: process.env.FEATURE_UNFINISHED === "true",
};  

// Exercise 2: use a config file to externalize values.