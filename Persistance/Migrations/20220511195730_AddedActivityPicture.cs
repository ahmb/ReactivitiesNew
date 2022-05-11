using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    public partial class AddedActivityPicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PictureId",
                table: "Activities",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Activities_PictureId",
                table: "Activities",
                column: "PictureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Photos_PictureId",
                table: "Activities",
                column: "PictureId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Photos_PictureId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_PictureId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "PictureId",
                table: "Activities");
        }
    }
}
