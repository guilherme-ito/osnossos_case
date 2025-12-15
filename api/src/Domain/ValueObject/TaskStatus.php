<?php

namespace App\Domain\ValueObject;

final class TaskStatus
{
    public const PENDING = 'pending';
    public const IN_PROGRESS = 'in_progress';
    public const COMPLETED = 'completed';

    private const VALID_STATUSES = [
        self::PENDING,
        self::IN_PROGRESS,
        self::COMPLETED,
    ];

    public static function isValid(string $status): bool
    {
        return in_array($status, self::VALID_STATUSES, true);
    }

    public static function getAll(): array
    {
        return self::VALID_STATUSES;
    }
}



