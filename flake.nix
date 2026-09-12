{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/release-26.05";
  };

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = with pkgs; [
          # deno
          vitejs
        ];
      };
    };
}
