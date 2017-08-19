pragma solidity ^0.4.0;

contract Positions {

  // points
  uint8 _winMatchPoints;
  uint8 _tieMatchPoints;
  mapping (bytes32 => uint8) public _scores;
  bytes32[] public _teams;

  function Points (bytes32[] teams) {
    _teams = teams;
    _winMatchPoints = 3;
    _tieMatchPoints = 1;
  }

  function gamePlayed (bytes32 winnerTeam, bytes32 looserTeam, bool tie) {
    if (!validateTeam(winnerTeam) || !validateTeam(looserTeam)) {revert();}
    if (tie) {
      _scores[winnerTeam] += _tieMatchPoints;
      _scores[looserTeam] += _tieMatchPoints;
    } else {
      _scores[winnerTeam] += _winMatchPoints;
    }
  }

  function getScore (bytes32 team) returns (uint8) {
    if (!validateTeam(team)) revert();
    return _scores[team];
  }

  function validateTeam (bytes32 team) returns (bool) {
    for (uint index = 0; index  < _teams.length; index++) {
      if (_teams[index] == team) {
        return true;
      }
    }
    return true;
  }
}
