-- CreateTable
CREATE TABLE "case" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "case_name" VARCHAR(255) NOT NULL,
    "case_type" VARCHAR(255),
    "date_reported" TIMESTAMP(6),
    "status" VARCHAR(255),
    "description" VARCHAR(255),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "compliance_name" VARCHAR(255) NOT NULL,
    "compliance_type" VARCHAR(255),
    "date_implemented" TIMESTAMP(6),
    "status" VARCHAR(255),
    "description" VARCHAR(255),
    "organization_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fraud" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fraud_name" VARCHAR(255) NOT NULL,
    "fraud_type" VARCHAR(255),
    "date_detected" TIMESTAMP(6),
    "status" VARCHAR(255),
    "description" VARCHAR(255),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fraud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "location" VARCHAR(255),
    "established_date" TIMESTAMP(6),
    "industry_type" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "policy_name" VARCHAR(255) NOT NULL,
    "policy_type" VARCHAR(255),
    "effective_date" TIMESTAMP(6),
    "expiry_date" TIMESTAMP(6),
    "description" VARCHAR(255),
    "organization_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "case" ADD CONSTRAINT "case_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "compliance" ADD CONSTRAINT "compliance_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fraud" ADD CONSTRAINT "fraud_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "policy" ADD CONSTRAINT "policy_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

