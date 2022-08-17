import { Fixture, MockContract } from "ethereum-waffle";
import { ContractFactory, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { FreezeContract } from "../../typechain/FreezeContract";
import { deployMockToken } from "./mocks";

type UnitStakingFixtureType = {
  freezeErc20: FreezeContract;
  mockToken: MockContract;
};

export const unitStakingFixture: Fixture<UnitStakingFixtureType> = async (
  signers: Wallet[]
) => {
  const deployer: Wallet = signers[0];
  const mockToken = await deployMockToken(deployer);

  const freezeContractFactory: ContractFactory = await ethers.getContractFactory(
    `FreezeContract`
  );

  const freezeErc20: FreezeContract = (await freezeContractFactory
    .connect(deployer)
    .deploy(parseEther("1000"))) as FreezeContract;

  await freezeErc20.deployed();


  return { freezeErc20, mockToken };
};
