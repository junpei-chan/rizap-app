<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class ConvertResponseKeysToCamelCase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // JsonResponseの場合のみ処理
        if ($response instanceof JsonResponse) {
            $data = $response->getData(true);
            
            // snake_case → camelCase に変換
            $converted = $this->convertKeysToCamelCase($data);
            
            $response->setData($converted);
        }
        
        return $response;
    }

    /**
     * 配列のキーを再帰的にcamelCaseに変換
     *
     * @param array $data
     * @return array
     */
    private function convertKeysToCamelCase(array $data): array
    {
        $result = [];
        
        foreach ($data as $key => $value) {
            $camelKey = $this->toCamelCase($key);
            
            // 値が配列の場合は再帰的に変換
            if (is_array($value)) {
                $result[$camelKey] = $this->convertKeysToCamelCase($value);
            } else {
                $result[$camelKey] = $value;
            }
        }
        
        return $result;
    }

    /**
     * 文字列をcamelCaseに変換
     *
     * @param string $string
     * @return string
     */
    private function toCamelCase(string $string): string
    {
        return lcfirst(str_replace('_', '', ucwords($string, '_')));
    }
}
