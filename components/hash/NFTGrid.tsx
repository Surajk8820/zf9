import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { Grid, Skeleton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import NFT from "./NFT";
import Link from "next/link";
import { HASH_NFT_COLLECTION_ADDRESS } from "../../const/addresses";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  gridCount?: number;
};

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "Sorry🙂, No NFTs found",
  gridCount,
}: Props) {
  // const [searchText, setSearchText] = useState("");
  // const [filteredData, setFilterData] = useState();

  // const handleChange = (e: any) => {
  //   const searchText = e.target.value.toLowerCase();
  //   const filteredData = data && data.filter((item) =>
  //     item.searchText.toLowerCase().includes(searchText)
  //   );
  //   console.log(filteredData);
  // };

  return (
    <Grid
      templateColumns={{
        base: `repeat(${1}, 1fr)`,
        md: `repeat(${gridCount}, 1fr)`,
      }}
      gap={6}
    >
      {isLoading ? (
        [...Array(8)].map((_, index) => (
          <Skeleton key={index} height={"312px"} width={"100%"} />
        ))
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/hash_page/token/${HASH_NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
            >
              <NFT nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} />
            </div>
          )
        )
      ) : (
        <Text>{emptyText}</Text>
      )}
    </Grid>
  );
}
