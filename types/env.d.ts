declare namespace NodeJS {
  interface ProcessEnv {
    TEST_EMAIL: string | undefined;
    TEST_PASSWORD: string | undefined;
  }
}