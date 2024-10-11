import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor class CarbonCreditCalculator() {
  stable var totalCredits : Nat = 0;
  stable var transactions : [Text] = [];

  // Get the total carbon credits
  public query func getTotalCredits() : async Nat {
    totalCredits;
  };

  // Get the history of carbon credit transactions
  public query func getTransactions() : async [Text] {
    transactions;
  };

  // Calculate and add carbon credits for a given energy usage (in kWh)
  public func calculateEnergyCredits(energyUsage : Nat) : async Nat {
    let credits = energyUsage * 2; // Example formula: 2 credits per kWh
    totalCredits += credits;
    recordTransaction("Energy", energyUsage, credits);
    return credits;
  };

  // Calculate and add carbon credits for transportation (in kilometers)
  public func calculateTransportCredits(distance : Nat, vehicleType : Text) : async Nat {
    var factor : Nat = switch(vehicleType) {
      case "Electric" { 1 }; // Electric vehicles get 1 credit per km
      case "Gasoline" { 5 };  // Gasoline vehicles get 5 credits per km
      case _ { 3 };           // Other vehicles get 3 credits per km
    };
    let credits = distance * factor;
    totalCredits += credits;
    recordTransaction("Transport", distance, credits);
    return credits;
  };

  // Reset the carbon credits count
  public func resetCredits() : async () {
    totalCredits := 0;
    transactions := [];
  };

  // Private helper to log each transaction
  private func recordTransaction(category : Text, input : Nat, credits : Nat) : () {
    let record = Text.concat("Category: ", category);
    let record2 = Text.concat(", Input: ", Nat.toText(input));
    let record3 = Text.concat(", Credits: ", Nat.toText(credits));
    let completeRecord = Text.concat(Text.concat(record, record2), record3);
     // Concatenate and reassign
  };
};
