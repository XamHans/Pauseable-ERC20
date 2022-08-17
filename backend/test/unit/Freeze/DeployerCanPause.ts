import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { parse } from "path";

export const deployerShouldPause = (): void => {
  //   // to silent warning for duplicate definition of Transfer event
  //   ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

  context(`#deployer permission pause`, async function () {

    it("should pause if called by deployer ", async function () {
      await expect(this.freezeErc20.connect(this.signers.deployer).pause())
        .to.emit(this.freezeErc20, "Paused")
        .withArgs(this.signers.deployer.address)
    })

    it("should revert if another than deployer try to pause", async function () {
      await expect(this.freezeErc20.connect(this.signers.bob).pause())
        .to.be.revertedWith('Ownable: caller is not the owner')
    })
  });
};
