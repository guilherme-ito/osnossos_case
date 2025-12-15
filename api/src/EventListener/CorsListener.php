<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class CorsListener
{
    public function onKernelResponse(ResponseEvent $event): void
    {
        $response = $event->getResponse();
        $request = $event->getRequest();

        // Headers CORS
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Max-Age', '3600');

        // Resposta para requisições OPTIONS (preflight)
        if ($request->getMethod() === 'OPTIONS') {
            $response->setStatusCode(Response::HTTP_NO_CONTENT);
            $response->setContent('');
        }
    }
}

