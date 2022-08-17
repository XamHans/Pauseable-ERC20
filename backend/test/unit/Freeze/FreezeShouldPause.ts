import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { parse } from "path";

export const shouldPause = (): void => {
  //   // to silent warning for duplicate definition of Transfer event
  //   ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

  context(`#pause`, async function () {

    it("should revert with Pausable: paused Error while paused ", async function () {
      await this.freezeErc20.pause();
      await expect(
        this.freezeErc20.connect(this.signers.deployer).transfer(this.signers.bob.address, parseEther("250"))
      ).to.be.revertedWith('Pausable: paused')
    })

    it("should emit pause event when pause activated", async function () {
      await expect(this.freezeErc20.connect(this.signers.deployer).pause())
        .to.emit(this.freezeErc20, "Paused")
        .withArgs(this.signers.deployer.address)
    })
  });
};
