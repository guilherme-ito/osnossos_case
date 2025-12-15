<?php

namespace App\Application\DTO;

use App\Domain\Entity\Task;

class TaskResponseDTO
{
    public int $id;
    public string $title;
    public ?string $description;
    public string $status;
    public string $createdAt;
    public ?string $updatedAt;
    public ?string $completedAt;
    public bool $isFavorite;
    public ?string $dueDate;

    public static function fromEntity(Task $task): self
    {
        $dto = new self();
        $dto->id = $task->getId();
        $dto->title = $task->getTitle();
        $dto->description = $task->getDescription();
        $dto->status = $task->getStatus();
        
        // Converter para fuso horário do Brasil (America/Sao_Paulo = UTC-3)
        $timezone = new \DateTimeZone('America/Sao_Paulo');
        
        $createdAt = $task->getCreatedAt()->setTimezone($timezone);
        $dto->createdAt = $createdAt->format('Y-m-d\TH:i:s');
        
        $dto->updatedAt = $task->getUpdatedAt() 
            ? $task->getUpdatedAt()->setTimezone($timezone)->format('Y-m-d\TH:i:s')
            : null;
        
        $dto->completedAt = $task->getCompletedAt()
            ? $task->getCompletedAt()->setTimezone($timezone)->format('Y-m-d\TH:i:s')
            : null;

        $dto->isFavorite = $task->isFavorite();
        
        $dto->dueDate = $task->getDueDate()
            ? $task->getDueDate()->setTimezone($timezone)->format('Y-m-d\TH:i:s')
            : null;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'completedAt' => $this->completedAt,
            'isFavorite' => $this->isFavorite,
            'dueDate' => $this->dueDate,
        ];
    }
}



