import { waffle } from "hardhat";
import { unitStakingFixture } from "../shared/fixtures";
import { Mocks, Signers } from "../shared/types";
import { shouldPause } from "./Freeze/FreezeShouldPause";
import { shouldTransferWhileUnpause } from "./Freeze/FreezeShouldTransferWhileUnpause";
import { deployerShouldPause } from "./Freeze/DeployerCanPause";

describe(`Unit tests`, async () => {
  before(async function () {
    const wallets = waffle.provider.getWallets();

    this.signers = {} as Signers;
    this.signers.deployer = wallets[0];
    this.signers.alice = wallets[1];
    this.signers.bob = wallets[2];

    this.loadFixture = waffle.createFixtureLoader(wallets);
  });

  describe(`FreezeContract Test Suite`, async () => {
    beforeEach(async function () {
      const { freezeErc20, mockToken } = await this.loadFixture(unitStakingFixture);

      this.freezeErc20 = freezeErc20;

      this.mocks = {} as Mocks;
      this.mocks.mockToken = mockToken;
    });

    shouldPause();
    shouldTransferWhileUnpause();
    deployerShouldPause();
  });
});
