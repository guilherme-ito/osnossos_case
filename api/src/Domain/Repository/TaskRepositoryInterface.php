<?php

namespace App\Domain\Repository;

use App\Domain\Entity\Task;

interface TaskRepositoryInterface
{
    public function save(Task $task): void;

    public function find(int $id): ?Task;

    /**
     * @return Task[]
     */
    public function findAll(): array;

    /**
     * @return Task[]
     */
    public function findByStatus(string $status): array;

    public function delete(Task $task): void;
}



