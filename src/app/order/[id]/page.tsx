"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaX, FaCheck, FaClock, FaHouse } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  if (!id) {
    return (
      <div>
        <h1>Order not found</h1>
        <Link href="/" className="bg-black rounded-xl px-4 py-2 text-white">
          <FaHouse />
        </Link>
      </div>
    );
    //toast.error("Order not found");
    // router.push("/");
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/");
  //   }, 5000);
  // }, [router]);

  return (
    <div>
      {status === "pending" && <FaClock className="text-orange-400" />}
      {status === "success" && <FaCheck className="text-green-400" />}
      {status === "failed" && <FaX className="text-red-400" />}
      <h1>
        Your order {id} is {status}
      </h1>
      <Link href="/" className="bg-black rounded-xl px-4 py-2 text-white">
        <FaHouse />
      </Link>
    </div>
  );
}
