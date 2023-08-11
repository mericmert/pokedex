import { PokemonType } from "models";

export default function TypeLabel({ type }: { type: PokemonType }) {
  return (
    <div className="min-w-[80px] min-h-[25px] flex justify-center items-center rounded-md text-white text-center break-words px-2 text-sm"
    style={{backgroundColor : type.color}}>
      {type?.name}
    </div>
  )
}
