namespace Arpick.Model
{
    public class Package
    {
        public int PackageId { get; set; }
        public string SenderName { get; set; }
        public string SenderAddress { get; set; }
        public string SenderContact { get; set; }
        public string ReceiverName { get; set; }
        public string ReceiverAddress { get; set; }
        public string ReceiverContact { get; set; }
        public string PackageName { get; set; }
        public string PackageWeight { get; set; }
        public int UserId { get; set; }
    }
}
