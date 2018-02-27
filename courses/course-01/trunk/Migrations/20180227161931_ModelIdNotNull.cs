using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace trunk.Migrations
{
    public partial class ModelIdNotNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Models_ModelId",
                table: "Vehicles");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Models_ModelId",
                table: "Vehicles",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Models_ModelId",
                table: "Vehicles");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "Vehicles",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Models_ModelId",
                table: "Vehicles",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
