import React from "react";
import { useParams } from "react-router";

export default function Slug() {
  const params = useParams();
  return <div>Slug: {params.slug}</div>;
}
