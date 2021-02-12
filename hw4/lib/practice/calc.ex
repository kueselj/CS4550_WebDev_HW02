defmodule Practice.Calc do
  def parse_float(text) do
    {num, _} = Float.parse(text)
    num
  end

  defp tag_tokens(x) do
    cond do 
      x == "+" -> {:op, "+"}
      x == "-" -> {:op, "-"}
      x == "*" -> {:op, "*"}
      x == "/" -> {:op, "/"}
      true -> {:num, Integer.parse(x)}
    end
  end

  #Last Thing that needs doing
  defp addTheStack(stack, postfixList) do
    cond do
      Enum.count(stack) == 0 -> inspect(postfixList)
      true -> addTheStack(Enum.slice(stack, 1, Enum.count(stack) - 1), postfixList ++ [Enum.at(stack, 0)])
    end
  end

  defp betterOperator(op, opOnStack) do
    cond do
      opOnStack == "*" -> true
      (opOnStack == "/" and op != "*") -> true
      (opOnStack == "+" and (op != "*" and op != "/")) -> true
      (opOnStack == "-" and (op != "*" and op != "/" and op != "+")) -> true
      true -> false
    end

  end



  defp readAnOperator(operator, list, stack, postfixList) do
    cond do
      Enum.count(stack) == 0 -> postfix(list, [operator | stack], postfixList)
      betterOperator(operator, Enum.at(stack, 0)) -> postfix(list, [operator | (stack -- [Enum.at(stack, 0)])], postfixList ++ [Enum.at(stack, 0)])
      true -> postfix(list, [operator | stack], postfixList)
    end

  end

  defp readANumber(num, list, stack, postfixList) do
    
    postfix(list, stack, postfixList ++ [num])
  end

  

  defp eval(list, stack, postfixList) do
    t = Enum.at(list,0)
    type = elem(t, 0)
    val = elem(t, 1)
    
    cond do
      type == :op -> readAnOperator(val, Enum.slice(list, 1, Enum.count(list) - 1), stack, postfixList)
      type == :num -> readANumber(val, Enum.slice(list, 1, Enum.count(list) - 1), stack, postfixList)
    end
  end



  def postfix(list, stack, postfixList) do
    cond do
      Enum.count(list) == 0 -> addTheStack(stack, postfixList)
      true -> eval(list, stack, postfixList)
        
    end
  end


def calc(expr) do
    # This should handle +,-,*,/ with order of operations,
    # but doesn't need to handle parens.
    split = expr|> String.split(~r/\s+/)
    #|> hd
    #|> parse_float
    #|> :math.sqrt()

    # Hint:
    # expr
    tagged = Enum.map(split, fn(x) -> tag_tokens(x) end)

    post = postfix(tagged,[],[])
    
    post
    
    
    # |> split
    # |> tag_tokens  (e.g. [+, 1] => [{:op, "+"}, {:num, 1.0}]
    # |> convert to postfix
    # |> reverse to prefix
    # |> evaluate as a stack calculator using pattern matching
  end
end
