<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241215150000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add isFavorite and dueDate fields to tasks table';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tasks ADD is_favorite TINYINT(1) DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE tasks ADD due_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tasks DROP is_favorite');
        $this->addSql('ALTER TABLE tasks DROP due_date');
    }
}

