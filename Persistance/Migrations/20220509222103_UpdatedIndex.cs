using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    public partial class UpdatedIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Activities_Title_Description",
                table: "Activities");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_Title_Description_Tags_Category",
                table: "Activities",
                columns: new[] { "Title", "Description", "Tags", "Category" })
                .Annotation("Npgsql:IndexMethod", "GIN")
                .Annotation("Npgsql:TsVectorConfig", "english");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Activities_Title_Description_Tags_Category",
                table: "Activities");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_Title_Description",
                table: "Activities",
                columns: new[] { "Title", "Description" })
                .Annotation("Npgsql:IndexMethod", "GIN")
                .Annotation("Npgsql:TsVectorConfig", "english");
        }
    }
}
