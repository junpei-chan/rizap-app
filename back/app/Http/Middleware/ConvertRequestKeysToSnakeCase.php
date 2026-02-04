<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConvertRequestKeysToSnakeCase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // リクエストの全データを取得
        $input = $request->all();
        
        // camelCase → snake_case に変換
        $converted = $this->convertKeysToSnakeCase($input);
        
        // 変換後のデータでリクエストを置き換え
        $request->replace($converted);
        
        return $next($request);
    }

    /**
     * 配列のキーを再帰的にsnake_caseに変換
     *
     * @param array $data
     * @return array
     */
    private function convertKeysToSnakeCase(array $data): array
    {
        $result = [];
        
        foreach ($data as $key => $value) {
            $snakeKey = $this->toSnakeCase($key);
            
            // 値が配列の場合は再帰的に変換
            if (is_array($value)) {
                $result[$snakeKey] = $this->convertKeysToSnakeCase($value);
            } else {
                $result[$snakeKey] = $value;
            }
        }
        
        return $result;
    }

    /**
     * 文字列をsnake_caseに変換
     *
     * @param string $string
     * @return string
     */
    private function toSnakeCase(string $string): string
    {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $string));
    }
}
