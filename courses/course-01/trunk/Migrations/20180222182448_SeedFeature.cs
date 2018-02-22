using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace trunk.Migrations
{
    public partial class SeedFeature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES('Feature 1')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES('Feature 2')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES('Feature 3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features");
        }
    }
}
