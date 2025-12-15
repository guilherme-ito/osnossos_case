<?php

namespace App\Infrastructure\Repository;

use App\Domain\Entity\Task;
use App\Domain\Repository\TaskRepositoryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TaskRepository extends ServiceEntityRepository implements TaskRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Task::class);
    }

    public function save(Task $task): void
    {
        $this->getEntityManager()->persist($task);
        $this->getEntityManager()->flush();
    }

    public function find($id, $lockMode = null, $lockVersion = null): ?Task
    {
        return $this->findOneBy(['id' => $id]);
    }

    /**
     * @return Task[]
     */
    public function findAll(): array
    {
        return $this->findBy([], ['createdAt' => 'DESC']);
    }

    /**
     * @return Task[]
     */
    public function findByStatus(string $status): array
    {
        return $this->findBy(['status' => $status], ['createdAt' => 'DESC']);
    }

    public function delete(Task $task): void
    {
        $this->getEntityManager()->remove($task);
        $this->getEntityManager()->flush();
    }
}



