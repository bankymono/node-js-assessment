-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_episodeId_fkey`;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `episodes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
