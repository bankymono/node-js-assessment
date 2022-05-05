/*
  Warnings:

  - A unique constraint covering the columns `[episodeCode]` on the table `episodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `episodes_episodeCode_key` ON `episodes`(`episodeCode`);
