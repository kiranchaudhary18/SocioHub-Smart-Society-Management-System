package com.resicore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * MongoDB Configuration class.
 * Enables Mongo Auditing for automatic timestamp updates on entities.
 */
@Configuration
@EnableMongoAuditing
public class MongoConfig {
}
