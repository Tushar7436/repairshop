ALTER TABLE "customers" RENAME COLUMN "lastname" TO "last_name";--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "first_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "firstname";