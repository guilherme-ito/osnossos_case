<?php

namespace App\Application\DTO;

use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Validator\Constraints as Assert;

class CreateTaskDTO
{
    #[Assert\NotBlank(message: "Title cannot be blank")]
    #[Assert\Length(
        min: 1,
        max: 255,
        minMessage: "Title must be at least {{ limit }} characters",
        maxMessage: "Title cannot exceed {{ limit }} characters"
    )]
    public string $title = '';

    #[Assert\Length(
        max: 1000,
        maxMessage: "Description cannot exceed {{ limit }} characters"
    )]
    public ?string $description = null;

    #[Assert\Choice(
        choices: ['pending', 'in_progress'],
        message: "Status must be either 'pending' or 'in_progress'"
    )]
    public string $status = 'pending';

    public ?bool $isFavorite = false;

    public ?string $dueDate = null;
}



