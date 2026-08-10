terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Key Pair
resource "aws_key_pair" "deployer" {
  key_name   = "cargo-truck-frontend-key"
  public_key = var.public_key
}

# Security Group
resource "aws_security_group" "frontend_sg" {
  name        = "frontend_sg"
  description = "Allow HTTP and SSH traffic"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "cargo-truck-frontend-sg"
  }
}

# EC2 Instance
resource "aws_instance" "frontend_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = aws_key_pair.deployer.key_name

  vpc_security_group_ids = [aws_security_group.frontend_sg.id]

  tags = {
    Name = "cargo-truck-frontend"
  }
}
