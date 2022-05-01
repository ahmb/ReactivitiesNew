import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}


