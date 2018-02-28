using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace trunk.Migrations
{
    public partial class RepairDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Models_Makes_MakeId",
                table: "Models");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VechileId",
                table: "VehicleFeatures");

            migrationBuilder.RenameColumn(
                name: "VechileId",
                table: "VehicleFeatures",
                newName: "VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_VechileId",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_VehicleId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastUpdate",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MakeId",
                table: "Models",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Models_Makes_MakeId",
                table: "Models",
                column: "MakeId",
                principalTable: "Makes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Models_Makes_MakeId",
                table: "Models");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "VehicleFeatures",
                newName: "VechileId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_VehicleId",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_VechileId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastUpdate",
                table: "Vehicles",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<int>(
                name: "MakeId",
                table: "Models",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Models_Makes_MakeId",
                table: "Models",
                column: "MakeId",
                principalTable: "Makes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VechileId",
                table: "VehicleFeatures",
                column: "VechileId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
