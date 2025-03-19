{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs";

  outputs = {
    self,
    nixpkgs,
    ...
  } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.x86_64-linux.default =
      pkgs.mkShell
      {
        nativeBuildInputs = [
          pkgs.nodejs
        ];
      };
  };
}
