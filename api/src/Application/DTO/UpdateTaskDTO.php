<?php

namespace App\Application\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class UpdateTaskDTO
{
    #[Assert\Length(
        min: 1,
        max: 255,
        minMessage: "Title must be at least {{ limit }} characters",
        maxMessage: "Title cannot exceed {{ limit }} characters"
    )]
    public ?string $title = null;

    #[Assert\Length(
        max: 1000,
        maxMessage: "Description cannot exceed {{ limit }} characters"
    )]
    public ?string $description = null;

    #[Assert\Choice(
        choices: ['pending', 'in_progress', 'completed'],
        message: "Status must be one of: pending, in_progress, completed"
    )]
    public ?string $status = null;

    public ?bool $isFavorite = null;

    public ?string $dueDate = null;
}



