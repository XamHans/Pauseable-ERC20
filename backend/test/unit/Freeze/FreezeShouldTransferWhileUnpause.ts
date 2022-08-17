import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { parse } from "path";

export const shouldTransferWhileUnpause = (): void => {
  //   // to silent warning for duplicate definition of Transfer event
  //   ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

  context(`#unpause`, async function () {

    it("should transfer while being unpaused ", async function () {
      //before transfer
      const deployerBalanceBefore = await this.freezeErc20.balanceOf(this.signers.deployer.address)
      const bobBalanceBefore = await this.freezeErc20.balanceOf(this.signers.bob.address)
      expect(deployerBalanceBefore).to.equal(parseEther("1000"))
      expect(bobBalanceBefore).to.equal(parseEther("0"))

      //transfer
      await this.freezeErc20.connect(this.signers.deployer).transfer(this.signers.bob.address, parseEther("250"))

      // //after transfer 
      const deployerBalanceAfter = await this.freezeErc20.balanceOf(this.signers.deployer.address)
      const bobBalanceAfter = await this.freezeErc20.balanceOf(this.signers.bob.address)
      expect(deployerBalanceAfter).to.equal(parseEther("750"))
      expect(bobBalanceAfter).to.equal(parseEther("250"))
    })
  });
};
