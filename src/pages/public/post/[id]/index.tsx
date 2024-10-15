import React from "react";

import { getBaseLayout } from "@/widgets";
import { useRouter } from "next/router";

const Item = () => {

  const {query: {id}} = useRouter()

  return (
    <div>
      {id}
    </div>
  );
};

Item.getLayout = getBaseLayout
export default Item