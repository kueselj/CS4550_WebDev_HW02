defmodule Practice.Palindrome do

    def same(x) do
        length = Enum.count(x)
        
        cond do
            length == 0 -> true
            length == 1 -> true
            Enum.at(x, 0)== Enum.at(x, length - 1) -> same(Enum.slice(x, 1, length - 2))
            true -> false
        end
    end

    def palindrome(x) do
        
        result = same(String.graphemes(x))
        cond do
            result -> true
            true -> false
        end
        
    end

  end