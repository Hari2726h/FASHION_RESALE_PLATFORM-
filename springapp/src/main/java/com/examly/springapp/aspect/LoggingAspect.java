package com.examly.springapp.aspect;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;import org.aspectj.lang.annotation.Aspect;import org.aspectj.lang.annotation.Before;import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;import java.util.Arrays;@Aspect

public class LoggingAspect {    private final Logger logger = LoggerFactory.getLogger(this.getClass());    @Pointcut("execution(* com.example.demo.controller..(..))")    public void controllerMethods() {}    @Pointcut("execution(* com.example.demo.service..(..))")    public void serviceMethods() {}    @Before("controllerMethods()")    public void logBeforeController(JoinPoint joinPoint) {        logger.info("Entering controller method: {} with arguments: {}",         joinPoint.getSignature().getName(),         Arrays.toString(joinPoint.getArgs()));        }        @After("controllerMethods()")        public void logAfterController(JoinPoint joinPoint) {            logger.info("Exiting controller method: {}",             joinPoint.getSignature().getName());            }                        @Around("serviceMethods()")            public Object logAroundService(ProceedingJoinPoint joinPoint) throws Throwable {                logger.info("Entering service method: {} with arguments: {}",                 joinPoint.getSignature().getName(),                 Arrays.toString(joinPoint.getArgs()));                long startTime = System.currentTimeMillis();                Object result = joinPoint.proceed();                long endTime = System.currentTimeMillis();                logger.info("Exiting service method: {} with execution time: {} ms",                 joinPoint.getSignature().getName(),                 (endTime - startTime));                                return result;                }                                @Around("execution(* com.example.demo.repository..(..))")                public Object logAroundRepository(ProceedingJoinPoint joinPoint) throws Throwable {                    logger.debug("Repository operation: {} started with arguments: {}",                     joinPoint.getSignature().getName(),                     Arrays.toString(joinPoint.getArgs()));                    Object result = joinPoint.proceed();                    logger.debug("Repository operation: {} completed",                     joinPoint.getSignature().getName());                                        return result;                    }                                        @Around("execution(* com.example.demo.exception..(..))")                    public Object logExceptions(ProceedingJoinPoint joinPoint) throws Throwable {                        logger.error("Exception handler invoked: {}",                         joinPoint.getSignature().getName());
return joinPoint.proceed();}}