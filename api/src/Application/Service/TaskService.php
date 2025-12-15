<?php

namespace App\Application\Service;

use App\Application\DTO\CreateTaskDTO;
use App\Application\DTO\TaskResponseDTO;
use App\Application\DTO\UpdateTaskDTO;
use App\Domain\Entity\Task;
use App\Domain\Repository\TaskRepositoryInterface;
use App\Domain\ValueObject\TaskStatus;

class TaskService
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    ) {
    }

    public function createTask(CreateTaskDTO $dto): TaskResponseDTO
    {
        $task = new Task();
        $task->setTitle($dto->title);
        $task->setDescription($dto->description);
        $task->setStatus($dto->status);
        
        if ($dto->isFavorite !== null) {
            $task->setIsFavorite($dto->isFavorite);
        }
        
        if ($dto->dueDate !== null) {
            try {
                $dueDate = new \DateTimeImmutable($dto->dueDate);
                $task->setDueDate($dueDate);
            } catch (\Exception $e) {
                // Ignora se a data for inválida
            }
        }

        $this->taskRepository->save($task);

        return TaskResponseDTO::fromEntity($task);
    }

    public function updateTask(int $id, UpdateTaskDTO $dto): TaskResponseDTO
    {
        $task = $this->taskRepository->find($id);

        if (!$task) {
            throw new \RuntimeException("Task with id {$id} not found");
        }

        if ($dto->title !== null) {
            $task->setTitle($dto->title);
        }

        if ($dto->description !== null) {
            $task->setDescription($dto->description);
        }

        if ($dto->status !== null) {
            $task->setStatus($dto->status);
        }

        if ($dto->isFavorite !== null) {
            $task->setIsFavorite($dto->isFavorite);
        }

        if ($dto->dueDate !== null) {
            try {
                $dueDate = new \DateTimeImmutable($dto->dueDate);
                $task->setDueDate($dueDate);
            } catch (\Exception $e) {
                // Ignora se a data for inválida
            }
        } elseif ($dto->dueDate === '') {
            // Permite limpar a data de vencimento
            $task->setDueDate(null);
        }

        $this->taskRepository->save($task);

        return TaskResponseDTO::fromEntity($task);
    }

    public function getTask(int $id): TaskResponseDTO
    {
        $task = $this->taskRepository->find($id);

        if (!$task) {
            throw new \RuntimeException("Task with id {$id} not found");
        }

        return TaskResponseDTO::fromEntity($task);
    }

    /**
     * @return TaskResponseDTO[]
     */
    public function getAllTasks(?string $status = null): array
    {
        $tasks = $status
            ? $this->taskRepository->findByStatus($status)
            : $this->taskRepository->findAll();

        return array_map(
            fn(Task $task) => TaskResponseDTO::fromEntity($task),
            $tasks
        );
    }

    public function deleteTask(int $id): void
    {
        $task = $this->taskRepository->find($id);

        if (!$task) {
            throw new \RuntimeException("Task with id {$id} not found");
        }

        $this->taskRepository->delete($task);
    }
}



