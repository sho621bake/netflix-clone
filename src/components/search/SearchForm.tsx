import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 検索ページに遷移
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md">
      <Input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="映画のタイトル、人物名、ジャンルなど..."
        className="bg-gray-800 border-gray-700 text-white"
      />
      <Button type="submit" className="ml-2">
        <SearchIcon className="mr-2 h-4 w-4" />
        検索
      </Button>
    </form>
  );
}
