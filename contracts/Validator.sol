pragma solidity ^0.4.15;

contract TestList {
  address[] private _validatorArr;
	address[] private _pendingArr = [0x218c072046d9accab6c01a182686f0b28df309b1, 0x695bc31ac61b1349e0e76df6cfaf70f6bbbd8442];
	mapping(address => uint) _indices;
	address public _disliked;
	bool private _finalized;

  event InitiateChange(bytes32 indexed _parent_hash, address[] _new_set);
  event ChangeFinalized(address[] current_set);


	modifier when_finalized() {
		require (finalized);
		_;
	}

	modifier only_system_and_not_finalized() {
		require (msg.sender == SYSTEM_ADDRESS);
		_;
	}

	function TestList() {
		_validatorArr = _pendingArr;
    for (uint i = 0; i < _validatorArr.length; i++) {
        _indices[_validatorArr[i]] = i;
    }
	}

	// Called on every block to update node validator list.
  function getValidators() constant returns (address[]) {
		return _validatorArr;
	}

	// Expand the list of validators.
	function addValidator(address validator) {
		_pendingArr.push(validator);
    initiateChange();
  }

	// Remove a validator from the list. TODO: terminar!
	function reportMalicious(address validator, uint blockNumber) {
		_pendingArr[_indices[validator]] = _pendingArr[_pendingArr.length-1];
		delete _indices[validator];
		delete _pendingArr[_pendingArr.length-1];
		_pendingArr.length--;
		InitiateChange(block.blockhash(block.number - 1), _pendingArr);
	}

	function reportBenign(address validator) {
    _disliked = validator;
	}

  function initiateChange() private when_finalized{
		_finalized = false;
    InitiateChange(block.blockhash(block.number - 1), _pendingArr);
  }

	function finalizeChange() only_system_and_not_finalized{
    _validatorArr = _pendingArr;
    _finalized = true;
    ChangeFinalized(_validatorArr);
  }
}
