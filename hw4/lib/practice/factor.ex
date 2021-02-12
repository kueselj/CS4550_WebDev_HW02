defmodule Practice.Factor do

   
    def factorStart(x) do
        cond do
            x < 2 -> ["Nothing!"]
            true -> factorMain(x, 2, [])
        end
    end

    def factorMain(x, divisor, acc) do
        cond do
            x < divisor -> acc
            rem(x, divisor) == 0 -> factorMain(div(x, divisor), divisor, [divisor | acc])
            ##This is innefiecient but will work.
            true -> factorMain(x, divisor + 1, acc)
        end
    end
      

    def factor(x) do
        
        
        list = factorStart(x) |> Enum.reverse()
        list
        
        
        
    end
end 