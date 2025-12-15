<?php

namespace App\Presentation\Controller;

use App\Application\DTO\CreateTaskDTO;
use App\Application\DTO\UpdateTaskDTO;
use App\Application\Service\TaskService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/tasks', name: 'api_tasks_')]
class TaskController extends AbstractController
{
    public function __construct(
        private readonly TaskService $taskService,
        private readonly SerializerInterface $serializer,
        private readonly ValidatorInterface $validator
    ) {
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json(
                    ['error' => 'Invalid JSON'],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $dto = new CreateTaskDTO();
            $dto->title = $data['title'] ?? '';
            $dto->description = $data['description'] ?? null;
            $dto->status = $data['status'] ?? 'pending';
            $dto->isFavorite = $data['isFavorite'] ?? false;
            $dto->dueDate = $data['dueDate'] ?? null;

            $errors = $this->validator->validate($dto);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getPropertyPath() . ': ' . $error->getMessage();
                }
                return $this->json(
                    ['errors' => $errorMessages],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $task = $this->taskService->createTask($dto);

            return $this->json(
                $task->toArray(),
                Response::HTTP_CREATED
            );
        } catch (\Exception $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('/{id}', name: 'get', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function get(int $id): JsonResponse
    {
        try {
            $task = $this->taskService->getTask($id);

            return $this->json(
                $task->toArray(),
                Response::HTTP_OK
            );
        } catch (\RuntimeException $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        try {
            $status = $request->query->get('status');
            
            if ($status && !in_array($status, ['pending', 'in_progress', 'completed'], true)) {
                return $this->json(
                    ['error' => 'Invalid status filter. Allowed values: pending, in_progress, completed'],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $tasks = $this->taskService->getAllTasks($status);

            $tasksArray = array_map(function($task) {
                return $task->toArray();
            }, $tasks);

            return $this->json(
                $tasksArray,
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH'], requirements: ['id' => '\d+'])]
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json(
                    ['error' => 'Invalid JSON'],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $dto = new UpdateTaskDTO();
            $dto->title = $data['title'] ?? null;
            $dto->description = $data['description'] ?? null;
            $dto->status = $data['status'] ?? null;
            $dto->isFavorite = isset($data['isFavorite']) ? (bool)$data['isFavorite'] : null;
            $dto->dueDate = $data['dueDate'] ?? null;

            $errors = $this->validator->validate($dto);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getPropertyPath() . ': ' . $error->getMessage();
                }
                return $this->json(
                    ['errors' => $errorMessages],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $task = $this->taskService->updateTask($id, $dto);

            return $this->json(
                $task->toArray(),
                Response::HTTP_OK
            );
        } catch (\RuntimeException $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $this->taskService->deleteTask($id);

            return $this->json(
                ['message' => 'Task deleted successfully'],
                Response::HTTP_NO_CONTENT
            );
        } catch (\RuntimeException $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return $this->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}



