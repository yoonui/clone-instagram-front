import { useParams } from "next/navigation";

export default function Index() {
  const params = useParams();

  return (
    <div>
      <>{params ? params.id : "ddd"}</>
    </div>
  );
}
